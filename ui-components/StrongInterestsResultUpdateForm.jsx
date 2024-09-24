/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getStrongInterestsResult } from "./graphql/queries";
import { updateStrongInterestsResult } from "./graphql/mutations";
const client = generateClient();
export default function StrongInterestsResultUpdateForm(props) {
  const {
    id: idProp,
    strongInterestsResult: strongInterestsResultModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    realistic: "",
    investigative: "",
    artistic: "",
    social: "",
    enterprising: "",
    conventional: "",
    owner: "",
  };
  const [realistic, setRealistic] = React.useState(initialValues.realistic);
  const [investigative, setInvestigative] = React.useState(
    initialValues.investigative
  );
  const [artistic, setArtistic] = React.useState(initialValues.artistic);
  const [social, setSocial] = React.useState(initialValues.social);
  const [enterprising, setEnterprising] = React.useState(
    initialValues.enterprising
  );
  const [conventional, setConventional] = React.useState(
    initialValues.conventional
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = strongInterestsResultRecord
      ? { ...initialValues, ...strongInterestsResultRecord }
      : initialValues;
    setRealistic(cleanValues.realistic);
    setInvestigative(cleanValues.investigative);
    setArtistic(cleanValues.artistic);
    setSocial(cleanValues.social);
    setEnterprising(cleanValues.enterprising);
    setConventional(cleanValues.conventional);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [strongInterestsResultRecord, setStrongInterestsResultRecord] =
    React.useState(strongInterestsResultModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getStrongInterestsResult.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getStrongInterestsResult
        : strongInterestsResultModelProp;
      setStrongInterestsResultRecord(record);
    };
    queryData();
  }, [idProp, strongInterestsResultModelProp]);
  React.useEffect(resetStateValues, [strongInterestsResultRecord]);
  const validations = {
    realistic: [],
    investigative: [],
    artistic: [],
    social: [],
    enterprising: [],
    conventional: [],
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
          realistic: realistic ?? null,
          investigative: investigative ?? null,
          artistic: artistic ?? null,
          social: social ?? null,
          enterprising: enterprising ?? null,
          conventional: conventional ?? null,
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
            query: updateStrongInterestsResult.replaceAll("__typename", ""),
            variables: {
              input: {
                id: strongInterestsResultRecord.id,
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
      {...getOverrideProps(overrides, "StrongInterestsResultUpdateForm")}
      {...rest}
    >
      <TextField
        label="Realistic"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={realistic}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              realistic: value,
              investigative,
              artistic,
              social,
              enterprising,
              conventional,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.realistic ?? value;
          }
          if (errors.realistic?.hasError) {
            runValidationTasks("realistic", value);
          }
          setRealistic(value);
        }}
        onBlur={() => runValidationTasks("realistic", realistic)}
        errorMessage={errors.realistic?.errorMessage}
        hasError={errors.realistic?.hasError}
        {...getOverrideProps(overrides, "realistic")}
      ></TextField>
      <TextField
        label="Investigative"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={investigative}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              realistic,
              investigative: value,
              artistic,
              social,
              enterprising,
              conventional,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.investigative ?? value;
          }
          if (errors.investigative?.hasError) {
            runValidationTasks("investigative", value);
          }
          setInvestigative(value);
        }}
        onBlur={() => runValidationTasks("investigative", investigative)}
        errorMessage={errors.investigative?.errorMessage}
        hasError={errors.investigative?.hasError}
        {...getOverrideProps(overrides, "investigative")}
      ></TextField>
      <TextField
        label="Artistic"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={artistic}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              realistic,
              investigative,
              artistic: value,
              social,
              enterprising,
              conventional,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.artistic ?? value;
          }
          if (errors.artistic?.hasError) {
            runValidationTasks("artistic", value);
          }
          setArtistic(value);
        }}
        onBlur={() => runValidationTasks("artistic", artistic)}
        errorMessage={errors.artistic?.errorMessage}
        hasError={errors.artistic?.hasError}
        {...getOverrideProps(overrides, "artistic")}
      ></TextField>
      <TextField
        label="Social"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={social}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              realistic,
              investigative,
              artistic,
              social: value,
              enterprising,
              conventional,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.social ?? value;
          }
          if (errors.social?.hasError) {
            runValidationTasks("social", value);
          }
          setSocial(value);
        }}
        onBlur={() => runValidationTasks("social", social)}
        errorMessage={errors.social?.errorMessage}
        hasError={errors.social?.hasError}
        {...getOverrideProps(overrides, "social")}
      ></TextField>
      <TextField
        label="Enterprising"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={enterprising}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              realistic,
              investigative,
              artistic,
              social,
              enterprising: value,
              conventional,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.enterprising ?? value;
          }
          if (errors.enterprising?.hasError) {
            runValidationTasks("enterprising", value);
          }
          setEnterprising(value);
        }}
        onBlur={() => runValidationTasks("enterprising", enterprising)}
        errorMessage={errors.enterprising?.errorMessage}
        hasError={errors.enterprising?.hasError}
        {...getOverrideProps(overrides, "enterprising")}
      ></TextField>
      <TextField
        label="Conventional"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={conventional}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              realistic,
              investigative,
              artistic,
              social,
              enterprising,
              conventional: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.conventional ?? value;
          }
          if (errors.conventional?.hasError) {
            runValidationTasks("conventional", value);
          }
          setConventional(value);
        }}
        onBlur={() => runValidationTasks("conventional", conventional)}
        errorMessage={errors.conventional?.errorMessage}
        hasError={errors.conventional?.hasError}
        {...getOverrideProps(overrides, "conventional")}
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
              realistic,
              investigative,
              artistic,
              social,
              enterprising,
              conventional,
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
          isDisabled={!(idProp || strongInterestsResultModelProp)}
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
              !(idProp || strongInterestsResultModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
