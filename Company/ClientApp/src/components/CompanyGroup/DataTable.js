import React from 'react'
import { Table, Button } from 'reactstrap';
import { ModalForm } from "../CompanyGroup/ModalForm";
import {useNavigate } from 'react-router-dom'

export function DataTable(props) {
    const navigate = useNavigate();
    const deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?')
        if (confirmDelete) {
            props.deleteItemFromState(id)
        }
    }

    const items = props.items.map(item => {
        return (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.ownerName}</td>
                <td>
                    <div>
                        <Button color="info" className="m-1" onClick={() => navigate(`/address`, { state: { type: 1, id:item.id  } })}>Address</Button>
                        <Button color="primary" className="m-1" onClick={() => navigate(`/contact`, { state: { type: 1, id: item.id } })}>Contact</Button>
                    </div>
                </td>
                <td>
                    <div>
                        <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
                        <Button color="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Owner Name</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </Table>
    )
}
