/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getProgramaParticular } from "./graphql/queries";
import { updateProgramaParticular } from "./graphql/mutations";
const client = generateClient();
export default function ProgramaParticularUpdateForm(props) {
  const {
    id: idProp,
    programaParticular: programaParticularModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    nombreDePrograma: "",
    owner: "",
  };
  const [nombreDePrograma, setNombreDePrograma] = React.useState(
    initialValues.nombreDePrograma
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = programaParticularRecord
      ? { ...initialValues, ...programaParticularRecord }
      : initialValues;
    setNombreDePrograma(cleanValues.nombreDePrograma);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [programaParticularRecord, setProgramaParticularRecord] =
    React.useState(programaParticularModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getProgramaParticular.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getProgramaParticular
        : programaParticularModelProp;
      setProgramaParticularRecord(record);
    };
    queryData();
  }, [idProp, programaParticularModelProp]);
  React.useEffect(resetStateValues, [programaParticularRecord]);
  const validations = {
    nombreDePrograma: [],
    owner: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          nombreDePrograma: nombreDePrograma ?? null,
          owner: owner ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateProgramaParticular.replaceAll("__typename", ""),
            variables: {
              input: {
                id: programaParticularRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProgramaParticularUpdateForm")}
      {...rest}
    >
      <TextField
        label="Nombre de programa"
        isRequired={false}
        isReadOnly={false}
        value={nombreDePrograma}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nombreDePrograma: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.nombreDePrograma ?? value;
          }
          if (errors.nombreDePrograma?.hasError) {
            runValidationTasks("nombreDePrograma", value);
          }
          setNombreDePrograma(value);
        }}
        onBlur={() => runValidationTasks("nombreDePrograma", nombreDePrograma)}
        errorMessage={errors.nombreDePrograma?.errorMessage}
        hasError={errors.nombreDePrograma?.hasError}
        {...getOverrideProps(overrides, "nombreDePrograma")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nombreDePrograma,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || programaParticularModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || programaParticularModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
