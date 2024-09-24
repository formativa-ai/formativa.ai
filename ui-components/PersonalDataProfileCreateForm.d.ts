import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type PersonalDataProfileCreateFormInputValues = {
    picture?: string;
    personalityType?: string;
    userType?: string;
    owner?: string;
};
export declare type PersonalDataProfileCreateFormValidationValues = {
    picture?: ValidationFunction<string>;
    personalityType?: ValidationFunction<string>;
    userType?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonalDataProfileCreateFormOverridesProps = {
    PersonalDataProfileCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    picture?: PrimitiveOverrideProps<TextFieldProps>;
    personalityType?: PrimitiveOverrideProps<SelectFieldProps>;
    userType?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PersonalDataProfileCreateFormProps = React.PropsWithChildren<{
    overrides?: PersonalDataProfileCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PersonalDataProfileCreateFormInputValues) => PersonalDataProfileCreateFormInputValues;
    onSuccess?: (fields: PersonalDataProfileCreateFormInputValues) => void;
    onError?: (fields: PersonalDataProfileCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonalDataProfileCreateFormInputValues) => PersonalDataProfileCreateFormInputValues;
    onValidate?: PersonalDataProfileCreateFormValidationValues;
} & React.CSSProperties>;
export default function PersonalDataProfileCreateForm(props: PersonalDataProfileCreateFormProps): React.ReactElement;
