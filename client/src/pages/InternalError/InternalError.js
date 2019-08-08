import React from 'react'
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent'

export default function InternalError() {
    return (
        <ErrorComponent title="500 Internal Server Error">Something went wrong.</ErrorComponent>
    );
};
