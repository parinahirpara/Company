import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export function AddEditContactForm(props) {
    const [contact, setContact] = useState({
        Id: 0,
        ContactType: "",
        ContactName: "",
        EntityId: 0,
        EntityType: 0
    });
    const onChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };
    const changePattern = (e) => {
        var contacttype = document.getElementById("ContactType").value;
        if (contacttype == 'Mobile Number') {
            document.getElementById("ContactName").pattern = "[7-9]{1}[0-9]{9}";
        }
        else if (contacttype == 'Email') {
            document.getElementById("ContactName").pattern = "^[a-zA-Z0-9+_.-]+@[a-zA-Z+_.-]+.[a-zA-Z]$";
        }
        else {
            document.getElementById("ContactName").pattern = "";
        }

    }

    const submitFormAdd = (e) => {
        e.preventDefault();
        props.addItemToState(contact);
        props.toggle();
    };

    const submitFormEdit = (e) => {
        e.preventDefault();
        props.updateState(contact);
        props.toggle();
    };

    useEffect(() => {
        if (props.item) {
            const data = { Id: props.item.id, ContactType: props.item.contactType, ContactName: props.item.contactName, EntityId: props.item.entityId, EntityType: props.item.entityType }
            setContact(data);
        }
    }, [props.item]);

    return (
        <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
            <FormGroup>
                <Label for="ContactType">Contact Type</Label>
                <Input
                    type="select"
                    name="ContactType"
                    id="ContactType"
                    onChange={(e) => { onChange(e); changePattern(e); }}
                    value={contact.ContactType === null ? "" : contact.ContactType}
                    required                >
                    <option value="">Select Contact Type</option>
                    <option value="Mobile Number">Mobile Number</option>
                    <option value="Email">Email</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="ContactName">Contact</Label>
                <Input
                    type="text"
                    name="ContactName" 
                    id="ContactName"
                    onChange={onChange}
                    value={contact.ContactName === null ? "" : contact.ContactName}
                    required
                />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    );
}

