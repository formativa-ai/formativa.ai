import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type StrongInterestsResultCreateFormInputValues = {
    realistic?: number;
    investigative?: number;
    artistic?: number;
    social?: number;
    enterprising?: number;
    conventional?: number;
    owner?: string;
};
export declare type StrongInterestsResultCreateFormValidationValues = {
    realistic?: ValidationFunction<number>;
    investigative?: ValidationFunction<number>;
    artistic?: ValidationFunction<number>;
    social?: ValidationFunction<number>;
    enterprising?: ValidationFunction<number>;
    conventional?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StrongInterestsResultCreateFormOverridesProps = {
    StrongInterestsResultCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    realistic?: PrimitiveOverrideProps<TextFieldProps>;
    investigative?: PrimitiveOverrideProps<TextFieldProps>;
    artistic?: PrimitiveOverrideProps<TextFieldProps>;
    social?: PrimitiveOverrideProps<TextFieldProps>;
    enterprising?: PrimitiveOverrideProps<TextFieldProps>;
    conventional?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StrongInterestsResultCreateFormProps = React.PropsWithChildren<{
    overrides?: StrongInterestsResultCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StrongInterestsResultCreateFormInputValues) => StrongInterestsResultCreateFormInputValues;
    onSuccess?: (fields: StrongInterestsResultCreateFormInputValues) => void;
    onError?: (fields: StrongInterestsResultCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StrongInterestsResultCreateFormInputValues) => StrongInterestsResultCreateFormInputValues;
    onValidate?: StrongInterestsResultCreateFormValidationValues;
} & React.CSSProperties>;
export default function StrongInterestsResultCreateForm(props: StrongInterestsResultCreateFormProps): React.ReactElement;
