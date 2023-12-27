import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { ModalForm } from "../Address/ModalForm";
import { DataTable } from "../Address/DataTable";
import { createAddress, getAllAddress, deleteCurrentAddress, updateCurrentAddress } from "../Services/AddressService";
import { useLocation } from 'react-router-dom';
export function Address(props) {
    var location = useLocation();
    const [addressitems, setAddressItems] = useState([
        {
            Id: 0,
            AddressType: "",
            AddressName: "",
            EntityId: 0,
            EntityType:0
        }
    ]);

    const getItems = (type, id) => {
        getAllAddress(type, id).then(response => {
            setAddressItems(response)
        }).catch(err => {
            console.log(err)
        })

    };

    const addItemToState = (item) => {
        
        const formData = new FormData();
        formData.append("AddressType", item.AddressType);
        formData.append("AddressName", item.AddressName);
        formData.append("EntityId", parseInt(location.state.id));
        formData.append("EntityType", parseInt(location.state.type));
        createAddress(formData).then(response => {
            setAddressItems([...addressitems, response]);
        })
    };

    const updateState = (items) => {
        const formData = new FormData();
        formData.append("Id", items.Id);
        formData.append("AddressType", items.AddressType);
        formData.append("AddressName", items.AddressName);
        formData.append("EntityId", parseInt(location.state.id));
        formData.append("EntityType", parseInt(location.state.type));
        updateCurrentAddress(formData).then(response => {
            getItems(parseInt(location.state.type), parseInt(location.state.id));
        })
    };

    const deleteItemFromState = (id) => {
        debugger;
        deleteCurrentAddress(id).then(response => {
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
                    <h1 style={{ margin: "20px 0" }}>Address</h1>
                </Col>

            </Row>
            <Row>
                <Col>
                    <ModalForm buttonLabel="Add" addItemToState={addItemToState} />
                </Col>
            </Row>
            {
                addressitems.length > 0 &&
                <Row>
                    <Col>
                        <DataTable
                            items={addressitems}
                            updateState={updateState}
                            deleteItemFromState={deleteItemFromState}
                        />
                    </Col>
                </Row>

            }
            
        </Container>
    );
}

