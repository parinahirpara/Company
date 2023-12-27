import React, { useState, useEffect } from "react";
import { Button, FormGroup, Label } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export function AddEditAddressForm(props) {
    const [address, setAddress] = useState({
        Id: 0,
        AddressType: "",
        AddressName: "",
        EntityId: 0,
        EntityType: 0
    });
    const validationSchema = Yup.object().shape({
        AddressType: Yup.string().required("Address Type is required"),
        AddressName: Yup.string()
            .required("Address Name is required"),
    });

    //const onChange = (e) => {
    //    setAddress({
    //        ...address,
    //        [e.target.name]: e.target.value
    //    });
    //};

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
            const data = { Id: props.item.id, AddressType: props.item.addressType, AddressName: props.item.addressName, EntityId: props.item.entityId, EntityType: props.item.entityType }
            setAddress(data);
        }
    }, [props.item]);

    return (
           <>
            <Formik initialValues={address} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true} >
                {({ errors, touched }) => {

                    return (
                        <Form>
                            <FormGroup>
                                <Label for="AddressType">Address Type</Label>
                                <Field
                                    as="select"
                                    name="AddressType"
                                    id="AddressType"
                                    autocomplete="off"
                                    className={
                                        'form-control' +
                                        (errors.AddressType && touched.AddressType
                                            ? ' is-invalid'
                                            : '')
                                    }
                                >
                                    <option value="">Select Address Type</option>
                                    <option value="Permanent Address">Permanent Address</option>
                                    <option value="Temporary Address">Temporary Address</option>
                                </Field>
                                <ErrorMessage name="AddressType" component="div" className="invalid-feedback" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="AddressName">Address</Label>
                                <Field
                                    type="textarea"
                                    name="AddressName"
                                    id="AddressName"
                                    autocomplete="off"
                                    className={
                                        'form-control' +
                                        (errors.AddressName && touched.AddressName
                                            ? ' is-invalid'
                                            : '')
                                    }
                                />
                                <ErrorMessage name="AddressName" component="div" className="invalid-feedback" />
                            </FormGroup>
                            <Button type="submit">Submit</Button>
                            </Form>
                    );
                }}
            </Formik>
        </>
    );
           
}

