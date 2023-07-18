import logging
import logging.handlers
import os
from dotenv import load_dotenv

import requests
from sp_api.base import Marketplaces
from sp_api.api import Orders
from sp_api.api import Products
from datetime import datetime, timedelta
from sms import send_sms_via_email
import pytz
import json
import schedule
import time


load_dotenv()

# Get the current script's directory
current_dir = os.path.dirname(os.path.abspath(__file__))

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger_file_handler = logging.handlers.RotatingFileHandler(
    os.path.join(current_dir, "status.log"),
    "status.log",
    maxBytes=1024 * 1024,
    backupCount=1,
    encoding="utf8",
)
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger_file_handler.setFormatter(formatter)
logger.addHandler(logger_file_handler)



# Access credentials from the dictionary
credentials = {
    "refresh_token": os.environ.get("SP_API_REFRESH_TOKEN"),
    "lwa_app_id": os.environ.get("LWA_APP_ID"),
    "lwa_client_secret": os.environ.get("LWA_CLIENT_SECRET"),
    "aws_access_key": os.environ.get("SP_API_ACCESS_KEY"),
    "aws_secret_key": os.environ.get("SP_API_SECRET_KEY"),
    "role_arn": os.environ.get("SP_API_ROLE_ARN")
}

gmail_credentials = {
    "gmail_username": os.environ.get("GMAIL_USER"),
    "gmail_password": os.environ.get("GMAIL_PASSWORD")
}

try:
    SOME_SECRET = os.environ["SOME_SECRET"]
except KeyError:
    SOME_SECRET = "Token not available!"
    #logger.info("Token not available!")
    #raise

def main():
    logger.info(f"Token value: {SOME_SECRET}")
    # Set up the Sales API client
    orders_client = Orders(credentials=credentials, marketplace=Marketplaces.US)

    # get Pacific Time current date
    local_date = datetime.now(pytz.timezone("US/Pacific"))

    # UTC time zone
    current_date = datetime.now().astimezone(pytz.utc)
    adjusted_date = current_date - timedelta(minutes=3)

    onedayago = local_date - timedelta(days=2)
    # print(f"current_date: {current_date}")  
    # print(f"onedayago: {onedayago}")

    start_date = onedayago.strftime("%Y-%m-%dT%H:%M:%SZ")
    end_date = adjusted_date.strftime("%Y-%m-%dT%H:%M:%SZ")

    # Use the modified values in the API call
    response = orders_client.get_orders(
        CreatedAfter=start_date,
        CreatedBefore=end_date,
        MarketplaceIds=["ATVPDKIKX0DER"]
    )

    order_ids = []
    order_count = 0
    order_pending_count = 0
    fba_sales = 0
    fbm_sales = 0

    number = '7742396843'
    message = 'Total sales has met the threshold of $60.'
    provider = 'Verizon'
    sender_credentials = (gmail_credentials['gmail_username'], gmail_credentials['gmail_password'])

    # Iterate over the orders and extract the order IDs
    for order in response.payload['Orders']:
        #extract FBM orders (MFN)
        if order['FulfillmentChannel'] != 'AFN' and order['OrderStatus'] != 'Pending' and order['OrderStatus'] != 'Canceled':
            fbm_sales += float(order['OrderTotal']['Amount'])

        # extract FBA orders (AFN)
        elif order['FulfillmentChannel'] == 'AFN' and order['OrderStatus'] != 'Pending' and order['OrderStatus'] != 'Canceled':
            fba_sales += float(order['OrderTotal']['Amount'])

        # print the order data
        print(f'order: {json.dumps(order, indent=4)}')

        # extract order total
        if 'OrderTotal' in order:
            sale = float(order['OrderTotal']['Amount'])
            total_sales += sale
            order_count += 1

        # get pending orders
        elif order['OrderStatus'] == 'Pending':
            order_pending_count += 1
            # get order ids of pending orders only
            order_ids.append(order['AmazonOrderId'])


    asins = []


    # Iterate over the order IDs and get the (pending) order items
    for order in order_ids:
        response = orders_client.get_order_items(order_id=order)
        order_items = response.payload['OrderItems']
        print(f'order_items: {json.dumps(order_items, indent=4)}')
        # extract ASINs
        for item in order_items:
            asins.append(item['ASIN'])
    
    print(f'asins: {asins}')

    # grab products pricing information
    products_client = Products(credentials=credentials, marketplace=Marketplaces.US)
    
    price_response = products_client.get_product_pricing_for_asins(asin_list=asins, item_condition='New')
    for asin_data in price_response.payload:
        asin = asin_data
        print(f'asin_data: {json.dumps(asin, indent=4)}')
        



    print(f'order_pending_count: {order_pending_count}')            
    print(f'total_sales: {fba_sales}')
    print(f'fbm_sales: {fbm_sales}')
    print(f'order_count: {order_count}')





    # If total_sales reaches threshold, send text message
    if fbm_sales > 60:
        try:
            send_sms_via_email(number, message, provider, sender_credentials)
        except Exception as e:
            print(f'Error: {e}')
    
    # Get the current timestamp when main() is called
    current_timestamp = datetime.now().strftime("%m - %d %H:%M:%S")

    # Exit the function to pause the program
    return {
        'fbm_sales': [fbm_sales],
        'fba_sales': [fba_sales],
        'order_pending_count': [order_pending_count],
        'order_count': [order_count],
        'last_updated': [current_timestamp]
    }

   
# def run_program():
#     # Run the main function every 5 minutes
#     schedule.every(20).seconds.do(main)

#     while True:
#         schedule.run_pending()
#         time.sleep(5)


if __name__ == '__main__':
    main()
