import React from 'react'

export default function Badge({ name, className }) {
	return <div className={`badge badge-ghost ${className}`} >{name}</div>
}
