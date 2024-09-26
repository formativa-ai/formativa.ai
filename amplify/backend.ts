import {defineBackend} from '@aws-amplify/backend';
import {auth} from './auth/resource.js';
import {data} from './data/resource.js';
import {storage} from "./storage/resource";

const backend =
    defineBackend({
        auth,
        data,
        storage
    });



const { cfnIdentityPool } = backend.auth.resources.cfnResources;
cfnIdentityPool.allowUnauthenticatedIdentities = true;

const {cfnUserPool} = backend.auth.resources.cfnResources;
if (Array.isArray(cfnUserPool.schema)) {
    cfnUserPool.schema.push(
        {
            name: 'entityType',
            attributeDataType: 'String',
            developerOnlyAttribute: false,
            mutable: true,
            required: false,
            stringAttributeConstraints: {
                maxLength: '15',
                minLength: '0',
            }
        }, {
            name: 'entityName',
            attributeDataType: 'String',
            developerOnlyAttribute: false,
            mutable: true,
            required: false,
            stringAttributeConstraints: {
                maxLength: '60',
                minLength: '0',
            }
        }, {
            name: 'govId',
            attributeDataType: 'String',
            developerOnlyAttribute: false,
            mutable: false,
            required: false,
            stringAttributeConstraints: {
                maxLength: '20',
                minLength: '5',
            }
        }, {
            name: 'personalityType',
            attributeDataType: 'String',
            developerOnlyAttribute: false,
            mutable: true,
            required: false,
            stringAttributeConstraints: {
                maxLength: '4',
                minLength: '0',
            }
        }, {
            name: 'userType',
            attributeDataType: 'String',
            developerOnlyAttribute: false,
            mutable: true,
            required: false,
            stringAttributeConstraints: {
                maxLength: '20',
                minLength: '0',
            }
        }, {
            name: 'realistic',
            attributeDataType: 'Number',
            developerOnlyAttribute: false,
            mutable: true,
            required: false,
            numberAttributeConstraints: {
                maxValue: '10',
                minValue: '0',
            }
        }
        , {
            name: 'investigative',
            attributeDataType: 'Number',
            developerOnlyAttribute: false,
            mutable: true,
            required: false,
            numberAttributeConstraints: {
                maxValue: '10',
                minValue: '0',
            }
        }, {
            name: 'artistic',
            attributeDataType: 'Number',
            developerOnlyAttribute: false,
            mutable: true,
            required: false,
            numberAttributeConstraints: {
                maxValue: '10',
                minValue: '0',
            }
        }, {
            name: 'social',
            attributeDataType: 'Number',
            developerOnlyAttribute: false,
            mutable: true,
            required: false,
            numberAttributeConstraints: {
                maxValue: '10',
                minValue: '0',
            }
        }, {
            name: 'enterprising',
            attributeDataType: 'Number',
            developerOnlyAttribute: false,
            mutable: true,
            required: false,
            numberAttributeConstraints: {
                maxValue: '10',
                minValue: '0',
            }
        }, {
            name: 'conventional',
            attributeDataType: 'Number',
            developerOnlyAttribute: false,
            mutable: true,
            required: false,
            numberAttributeConstraints: {
                maxValue: '10',
                minValue: '0',
            }
        }
        // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cognito.CfnUserPool.html
    );
}