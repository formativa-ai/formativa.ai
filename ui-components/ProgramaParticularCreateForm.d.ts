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
export declare type ProgramaParticularCreateFormInputValues = {
    nombreDePrograma?: string;
    personalityType?: string;
    owner?: string;
};
export declare type ProgramaParticularCreateFormValidationValues = {
    nombreDePrograma?: ValidationFunction<string>;
    personalityType?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramaParticularCreateFormOverridesProps = {
    ProgramaParticularCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    nombreDePrograma?: PrimitiveOverrideProps<TextFieldProps>;
    personalityType?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProgramaParticularCreateFormProps = React.PropsWithChildren<{
    overrides?: ProgramaParticularCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProgramaParticularCreateFormInputValues) => ProgramaParticularCreateFormInputValues;
    onSuccess?: (fields: ProgramaParticularCreateFormInputValues) => void;
    onError?: (fields: ProgramaParticularCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProgramaParticularCreateFormInputValues) => ProgramaParticularCreateFormInputValues;
    onValidate?: ProgramaParticularCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramaParticularCreateForm(props: ProgramaParticularCreateFormProps): React.ReactElement;
