import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { ProgramaParticularPersonalityType } from "./graphql/types";
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
export declare type ProgramaParticularPersonalityTypeUpdateFormInputValues = {};
export declare type ProgramaParticularPersonalityTypeUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramaParticularPersonalityTypeUpdateFormOverridesProps = {
    ProgramaParticularPersonalityTypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type ProgramaParticularPersonalityTypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProgramaParticularPersonalityTypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    programaParticularPersonalityType?: ProgramaParticularPersonalityType;
    onSubmit?: (fields: ProgramaParticularPersonalityTypeUpdateFormInputValues) => ProgramaParticularPersonalityTypeUpdateFormInputValues;
    onSuccess?: (fields: ProgramaParticularPersonalityTypeUpdateFormInputValues) => void;
    onError?: (fields: ProgramaParticularPersonalityTypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProgramaParticularPersonalityTypeUpdateFormInputValues) => ProgramaParticularPersonalityTypeUpdateFormInputValues;
    onValidate?: ProgramaParticularPersonalityTypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramaParticularPersonalityTypeUpdateForm(props: ProgramaParticularPersonalityTypeUpdateFormProps): React.ReactElement;
