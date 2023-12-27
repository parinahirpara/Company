import React from 'react'
import { Table, Button } from 'reactstrap';
import { ModalForm } from "../Contact/ModalForm";
import { useNavigate } from 'react-router-dom'

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
            <tr key={Math.random()}>
                <td>{item.contactName}</td>
                <td>{item.contactType}</td>
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
                    <th>Contact</th>
                    <th>Contact Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </Table>
    )
}
