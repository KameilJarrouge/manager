import { Formik } from "formik";
import React from "react";

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
