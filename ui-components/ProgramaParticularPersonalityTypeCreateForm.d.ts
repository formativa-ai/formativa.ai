import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
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
export declare type ProgramaParticularPersonalityTypeCreateFormInputValues = {};
export declare type ProgramaParticularPersonalityTypeCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramaParticularPersonalityTypeCreateFormOverridesProps = {
    ProgramaParticularPersonalityTypeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type ProgramaParticularPersonalityTypeCreateFormProps = React.PropsWithChildren<{
    overrides?: ProgramaParticularPersonalityTypeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProgramaParticularPersonalityTypeCreateFormInputValues) => ProgramaParticularPersonalityTypeCreateFormInputValues;
    onSuccess?: (fields: ProgramaParticularPersonalityTypeCreateFormInputValues) => void;
    onError?: (fields: ProgramaParticularPersonalityTypeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProgramaParticularPersonalityTypeCreateFormInputValues) => ProgramaParticularPersonalityTypeCreateFormInputValues;
    onValidate?: ProgramaParticularPersonalityTypeCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramaParticularPersonalityTypeCreateForm(props: ProgramaParticularPersonalityTypeCreateFormProps): React.ReactElement;
