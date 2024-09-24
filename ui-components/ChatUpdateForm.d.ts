import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Chat } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ChatUpdateFormInputValues = {
    threadId?: string;
    owner?: string;
};
export declare type ChatUpdateFormValidationValues = {
    threadId?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChatUpdateFormOverridesProps = {
    ChatUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    threadId?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ChatUpdateFormProps = React.PropsWithChildren<{
    overrides?: ChatUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    chat?: Chat;
    onSubmit?: (fields: ChatUpdateFormInputValues) => ChatUpdateFormInputValues;
    onSuccess?: (fields: ChatUpdateFormInputValues) => void;
    onError?: (fields: ChatUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChatUpdateFormInputValues) => ChatUpdateFormInputValues;
    onValidate?: ChatUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ChatUpdateForm(props: ChatUpdateFormProps): React.ReactElement;
