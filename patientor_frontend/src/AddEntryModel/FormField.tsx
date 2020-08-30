import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis} from "../types";

interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};


export const EntryTypeSelection = ({
  options,
  setFieldValue,
  setFieldTouched,
  setinitialValues
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  setFieldValue: FormikProps<{ type: string }>["setFieldValue"];
  setFieldTouched: FormikProps<{ type: string }>["setFieldTouched"];
  setinitialValues: () => void;
}) => {
  const field = "type";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setinitialValues();
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stateOptions = options.map((option: { value: any }) => ({
    key: option.value,
    text: option.value,
    value: option.value
  }));
  return (
    <Form.Field>
      <label>Type</label>
      <Dropdown
        defaultValue ="HealthCheck"
        fluid
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};