/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getChat } from "./graphql/queries";
import { updateChat } from "./graphql/mutations";
const client = generateClient();
export default function ChatUpdateForm(props) {
  const {
    id: idProp,
    chat: chatModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    threadId: "",
    owner: "",
  };
  const [threadId, setThreadId] = React.useState(initialValues.threadId);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = chatRecord
      ? { ...initialValues, ...chatRecord }
      : initialValues;
    setThreadId(cleanValues.threadId);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [chatRecord, setChatRecord] = React.useState(chatModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getChat.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getChat
        : chatModelProp;
      setChatRecord(record);
    };
    queryData();
  }, [idProp, chatModelProp]);
  React.useEffect(resetStateValues, [chatRecord]);
  const validations = {
    threadId: [{ type: "Required" }],
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
          threadId,
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
            query: updateChat.replaceAll("__typename", ""),
            variables: {
              input: {
                id: chatRecord.id,
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
      {...getOverrideProps(overrides, "ChatUpdateForm")}
      {...rest}
    >
      <TextField
        label="Thread id"
        isRequired={true}
        isReadOnly={false}
        value={threadId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              threadId: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.threadId ?? value;
          }
          if (errors.threadId?.hasError) {
            runValidationTasks("threadId", value);
          }
          setThreadId(value);
        }}
        onBlur={() => runValidationTasks("threadId", threadId)}
        errorMessage={errors.threadId?.errorMessage}
        hasError={errors.threadId?.hasError}
        {...getOverrideProps(overrides, "threadId")}
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
              threadId,
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
          isDisabled={!(idProp || chatModelProp)}
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
              !(idProp || chatModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
