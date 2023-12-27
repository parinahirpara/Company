import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { ModalForm } from "../Contact/ModalForm";
import { DataTable } from "../Contact/DataTable";
import { useLocation } from 'react-router-dom';
import { createContact, getAllContact, deleteCurrentContact, updateCurrentContact } from "../Services/ContactService";
export function Contact(props) {
    var location = useLocation();
    const [contactitems, setContactItems] = useState([
        {
            Id: 0,
            ContactType: "",
            ContactName: "",
            EntityId: 0,
            EntityType: 0
        }
    ]);

    const getItems = (type, id) => {
        getAllContact(type, id).then(response => {
            setContactItems(response)
        }).catch(err => {
            console.log(err)
        })

    };

    const addItemToState = (item) => {

        const formData = new FormData();
        formData.append("ContactType", item.ContactType);
        formData.append("ContactName", item.ContactName);
        formData.append("EntityId", parseInt(location.state.id));
        formData.append("EntityType", parseInt(location.state.type));
        createContact(formData).then(response => {
            setContactItems([...contactitems, response]);
        })
    };

    const updateState = (items) => {
        debugger;
        const formData = new FormData();
        formData.append("Id", items.Id);
        formData.append("ContactType", items.ContactType);
        formData.append("ContactName", items.ContactName);
        formData.append("EntityId", parseInt(location.state.id));
        formData.append("EntityType", parseInt(location.state.type));
        updateCurrentContact(formData).then(response => {
            getItems(parseInt(location.state.type), parseInt(location.state.id));
        })
    };

    const deleteItemFromState = (id) => {
        deleteCurrentContact(id).then(response => {
            getItems(parseInt(location.state.type), parseInt(location.state.id));
        })
    };

    useEffect(() => {
        getItems(parseInt(location.state.type), parseInt(location.state.id));
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1 style={{ margin: "20px 0" }}>Contact</h1>
                </Col>

            </Row>
            <Row>
                <Col>
                    <ModalForm buttonLabel="Add" addItemToState={addItemToState} />
                </Col>
            </Row>
            {
                contactitems.length > 0 &&
                <Row>
                    <Col>
                        <DataTable
                            items={contactitems}
                            updateState={updateState}
                            deleteItemFromState={deleteItemFromState}
                        />
                    </Col>
                </Row>

            }
            
        </Container>
    );
}

