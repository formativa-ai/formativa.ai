/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getPersonalityType } from "./graphql/queries";
import { updatePersonalityType } from "./graphql/mutations";
const client = generateClient();
export default function PersonalityTypeUpdateForm(props) {
  const {
    id: idProp,
    personalityType: personalityTypeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    personalityType: "",
    weigth: "",
    owner: "",
  };
  const [personalityType, setPersonalityType] = React.useState(
    initialValues.personalityType
  );
  const [weigth, setWeigth] = React.useState(initialValues.weigth);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = personalityTypeRecord
      ? { ...initialValues, ...personalityTypeRecord }
      : initialValues;
    setPersonalityType(cleanValues.personalityType);
    setWeigth(cleanValues.weigth);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [personalityTypeRecord, setPersonalityTypeRecord] = React.useState(
    personalityTypeModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPersonalityType.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPersonalityType
        : personalityTypeModelProp;
      setPersonalityTypeRecord(record);
    };
    queryData();
  }, [idProp, personalityTypeModelProp]);
  React.useEffect(resetStateValues, [personalityTypeRecord]);
  const validations = {
    personalityType: [],
    weigth: [],
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
          personalityType: personalityType ?? null,
          weigth: weigth ?? null,
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
            query: updatePersonalityType.replaceAll("__typename", ""),
            variables: {
              input: {
                id: personalityTypeRecord.id,
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
      {...getOverrideProps(overrides, "PersonalityTypeUpdateForm")}
      {...rest}
    >
      <SelectField
        label="Personality type"
        placeholder="Please select an option"
        isDisabled={false}
        value={personalityType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              personalityType: value,
              weigth,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.personalityType ?? value;
          }
          if (errors.personalityType?.hasError) {
            runValidationTasks("personalityType", value);
          }
          setPersonalityType(value);
        }}
        onBlur={() => runValidationTasks("personalityType", personalityType)}
        errorMessage={errors.personalityType?.errorMessage}
        hasError={errors.personalityType?.hasError}
        {...getOverrideProps(overrides, "personalityType")}
      >
        <option
          children="Intj"
          value="INTJ"
          {...getOverrideProps(overrides, "personalityTypeoption0")}
        ></option>
        <option
          children="Intp"
          value="INTP"
          {...getOverrideProps(overrides, "personalityTypeoption1")}
        ></option>
        <option
          children="Entj"
          value="ENTJ"
          {...getOverrideProps(overrides, "personalityTypeoption2")}
        ></option>
        <option
          children="Entp"
          value="ENTP"
          {...getOverrideProps(overrides, "personalityTypeoption3")}
        ></option>
        <option
          children="Infj"
          value="INFJ"
          {...getOverrideProps(overrides, "personalityTypeoption4")}
        ></option>
        <option
          children="Infp"
          value="INFP"
          {...getOverrideProps(overrides, "personalityTypeoption5")}
        ></option>
        <option
          children="Enfj"
          value="ENFJ"
          {...getOverrideProps(overrides, "personalityTypeoption6")}
        ></option>
        <option
          children="Enfp"
          value="ENFP"
          {...getOverrideProps(overrides, "personalityTypeoption7")}
        ></option>
        <option
          children="Istj"
          value="ISTJ"
          {...getOverrideProps(overrides, "personalityTypeoption8")}
        ></option>
        <option
          children="Isfj"
          value="ISFJ"
          {...getOverrideProps(overrides, "personalityTypeoption9")}
        ></option>
        <option
          children="Estj"
          value="ESTJ"
          {...getOverrideProps(overrides, "personalityTypeoption10")}
        ></option>
        <option
          children="Esfj"
          value="ESFJ"
          {...getOverrideProps(overrides, "personalityTypeoption11")}
        ></option>
        <option
          children="Istp"
          value="ISTP"
          {...getOverrideProps(overrides, "personalityTypeoption12")}
        ></option>
        <option
          children="Isfp"
          value="ISFP"
          {...getOverrideProps(overrides, "personalityTypeoption13")}
        ></option>
        <option
          children="Estp"
          value="ESTP"
          {...getOverrideProps(overrides, "personalityTypeoption14")}
        ></option>
        <option
          children="Esfp"
          value="ESFP"
          {...getOverrideProps(overrides, "personalityTypeoption15")}
        ></option>
      </SelectField>
      <TextField
        label="Weigth"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={weigth}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              personalityType,
              weigth: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.weigth ?? value;
          }
          if (errors.weigth?.hasError) {
            runValidationTasks("weigth", value);
          }
          setWeigth(value);
        }}
        onBlur={() => runValidationTasks("weigth", weigth)}
        errorMessage={errors.weigth?.errorMessage}
        hasError={errors.weigth?.hasError}
        {...getOverrideProps(overrides, "weigth")}
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
              personalityType,
              weigth,
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
          isDisabled={!(idProp || personalityTypeModelProp)}
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
              !(idProp || personalityTypeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
