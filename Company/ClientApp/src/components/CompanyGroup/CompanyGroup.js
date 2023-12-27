import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { ModalForm } from "../CompanyGroup/ModalForm";
import { DataTable } from "../CompanyGroup/DataTable";
import { createCompanyGroup, getAllCompanyGroups, deleteCurrentGroup, updateCurrentCompanyGroup } from "../Services/CompanyGroupService";

export function CompanyGroup(props) {
    const [items, setItems] = useState([
        {
            id: 0,
            Name: "",
            OwnerName: "",
        }
    ]);

    const getItems = () => {
        getAllCompanyGroups().then(response => {
           setItems(response)
        }).catch(err => {
            console.log(err)
        })
        
    };

    const addItemToState = (item) => {
        const formData = new FormData();
        formData.append("Name", item.Name);
        formData.append("OwnerName", item.OwnerName);
        createCompanyGroup(formData).then(response => {
            setItems([...items, response]);
        })
    };

    const updateState = (items) => {
        const formData = new FormData();
        formData.append("Id", items.id);
        formData.append("Name", items.Name);
        formData.append("OwnerName", items.OwnerName);
        updateCurrentCompanyGroup(formData).then(response => {
            getItems();
        })
    };

    const deleteItemFromState = (id) => {
        deleteCurrentGroup(id).then(response => {
            getItems();
        })
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1 style={{ margin: "20px 0" }}>Company Group</h1>
                </Col>
               
            </Row>
            <Row>
                <Col>
                    <ModalForm buttonLabel="Add" addItemToState={addItemToState} />
                </Col>
            </Row>
            {
                items.length > 0 && 
                <Row>
                    <Col>
                        <DataTable
                            items={items}
                            updateState={updateState}
                            deleteItemFromState={deleteItemFromState}
                        />
                    </Col>
                </Row>
            }
            
            
        </Container>
    );
}

