import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { StrongInterestsResult } from "./graphql/types";
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
export declare type StrongInterestsResultUpdateFormInputValues = {
    realistic?: number;
    investigative?: number;
    artistic?: number;
    social?: number;
    enterprising?: number;
    conventional?: number;
    owner?: string;
};
export declare type StrongInterestsResultUpdateFormValidationValues = {
    realistic?: ValidationFunction<number>;
    investigative?: ValidationFunction<number>;
    artistic?: ValidationFunction<number>;
    social?: ValidationFunction<number>;
    enterprising?: ValidationFunction<number>;
    conventional?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StrongInterestsResultUpdateFormOverridesProps = {
    StrongInterestsResultUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    realistic?: PrimitiveOverrideProps<TextFieldProps>;
    investigative?: PrimitiveOverrideProps<TextFieldProps>;
    artistic?: PrimitiveOverrideProps<TextFieldProps>;
    social?: PrimitiveOverrideProps<TextFieldProps>;
    enterprising?: PrimitiveOverrideProps<TextFieldProps>;
    conventional?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StrongInterestsResultUpdateFormProps = React.PropsWithChildren<{
    overrides?: StrongInterestsResultUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    strongInterestsResult?: StrongInterestsResult;
    onSubmit?: (fields: StrongInterestsResultUpdateFormInputValues) => StrongInterestsResultUpdateFormInputValues;
    onSuccess?: (fields: StrongInterestsResultUpdateFormInputValues) => void;
    onError?: (fields: StrongInterestsResultUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StrongInterestsResultUpdateFormInputValues) => StrongInterestsResultUpdateFormInputValues;
    onValidate?: StrongInterestsResultUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StrongInterestsResultUpdateForm(props: StrongInterestsResultUpdateFormProps): React.ReactElement;
