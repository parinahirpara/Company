import React, { useState, useEffect } from "react";
import { Button, FormGroup, Label } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export function AddEditCompanyGroupForm(props) {
    const [companygroup, setCompanyGroup] = useState({
        id: 0,
        Name: "",
        OwnerName: ""
    });
    const validationSchema = Yup.object().shape({
        Name: Yup.string().required("Name is required"),
        OwnerName: Yup.string()
            .required("OwnerName is required"),
    });
    
    const submitFormAdd = (data) => {
        props.addItemToState(data);
        props.toggle();
        
    };

    const submitFormEdit = (data) => {
        props.updateState(data);
        props.toggle();
    };
    const onSubmit = (fields, { setStatus }) => {
        setStatus();
        if (props.item) {
            submitFormEdit(fields)
        }
        else {
            submitFormAdd(fields)
        }
    }
    useEffect(() => {
        if (props.item) {
            const data = { id: props.item.id, Name: props.item.name, OwnerName: props.item.ownerName }
            setCompanyGroup(data);
        }
    }, [props.item]); 
    return (
        <>
            <Formik initialValues={companygroup} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true} >
            {({ errors, touched }) => {
                
                return (
                    <Form>
                        <FormGroup>
                            <Label for="Name">Name</Label>
                            <Field 
                                type="text"
                                name="Name"
                                id="Name"
                                autocomplete="off"
                                className={
                                    'form-control' +
                                    (errors.Name && touched.Name
                                        ? ' is-invalid'
                                        : '')
                                }
                              
                            />
                            <ErrorMessage name="Name" component="div" className="invalid-feedback" />
                         
                        </FormGroup>
                        <FormGroup>
                            <Label for="OwnerName">Owner Name</Label>
                            <Field 
                                type="text"
                                name="OwnerName"
                                id="OwnerName"
                                autocomplete="off"
                                className={
                                    'form-control' +
                                    (errors.OwnerName && touched.OwnerName
                                        ? ' is-invalid'
                                        : '')
                                }
                            
                            />
                            <ErrorMessage name="OwnerName" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                );
            }}
            </Formik>
            </>
    );
}

