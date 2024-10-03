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
export declare type PersonalityTypeCreateFormInputValues = {
    personalityType?: string;
    weigth?: number;
    owner?: string;
};
export declare type PersonalityTypeCreateFormValidationValues = {
    personalityType?: ValidationFunction<string>;
    weigth?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonalityTypeCreateFormOverridesProps = {
    PersonalityTypeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    personalityType?: PrimitiveOverrideProps<SelectFieldProps>;
    weigth?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PersonalityTypeCreateFormProps = React.PropsWithChildren<{
    overrides?: PersonalityTypeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PersonalityTypeCreateFormInputValues) => PersonalityTypeCreateFormInputValues;
    onSuccess?: (fields: PersonalityTypeCreateFormInputValues) => void;
    onError?: (fields: PersonalityTypeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonalityTypeCreateFormInputValues) => PersonalityTypeCreateFormInputValues;
    onValidate?: PersonalityTypeCreateFormValidationValues;
} & React.CSSProperties>;
export default function PersonalityTypeCreateForm(props: PersonalityTypeCreateFormProps): React.ReactElement;
