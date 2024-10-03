import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { PersonalityType } from "./graphql/types";
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
export declare type PersonalityTypeUpdateFormInputValues = {
    personalityType?: string;
    weigth?: number;
    owner?: string;
};
export declare type PersonalityTypeUpdateFormValidationValues = {
    personalityType?: ValidationFunction<string>;
    weigth?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonalityTypeUpdateFormOverridesProps = {
    PersonalityTypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    personalityType?: PrimitiveOverrideProps<SelectFieldProps>;
    weigth?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PersonalityTypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: PersonalityTypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    personalityType?: PersonalityType;
    onSubmit?: (fields: PersonalityTypeUpdateFormInputValues) => PersonalityTypeUpdateFormInputValues;
    onSuccess?: (fields: PersonalityTypeUpdateFormInputValues) => void;
    onError?: (fields: PersonalityTypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonalityTypeUpdateFormInputValues) => PersonalityTypeUpdateFormInputValues;
    onValidate?: PersonalityTypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PersonalityTypeUpdateForm(props: PersonalityTypeUpdateFormProps): React.ReactElement;
