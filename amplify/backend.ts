import {defineBackend} from '@aws-amplify/backend';
import {auth} from './auth/resource.js';
import {data} from './data/resource.js';

const backend =
    defineBackend({
        auth,
        data,
    });



const { cfnIdentityPool } = backend.auth.resources.cfnResources;
cfnIdentityPool.allowUnauthenticatedIdentities = true;

const {cfnUserPool} = backend.auth.resources.cfnResources;
if (Array.isArray(cfnUserPool.schema)) {
    cfnUserPool.schema.push({
            name: 'govId',
            attributeDataType: 'String',
            developerOnlyAttribute: false,
        }, {
            name: 'entityType',
            attributeDataType: 'String',
            developerOnlyAttribute: false,
        }, {
            name: 'entityName',
            attributeDataType: 'String',
            developerOnlyAttribute: false,
        }
        // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cognito.CfnUserPool.html
        // ,{
        //     attributeDataType: 'attributeDataType',
        //         developerOnlyAttribute: false,
        //     mutable: false,
        //     name: 'name',
        //     numberAttributeConstraints: {
        //     maxValue: 'maxValue',
        //         minValue: 'minValue',
        //     },
        //     required: false,
        //         stringAttributeConstraints: {
        //     maxLength: 'maxLength',
        //         minLength: 'minLength',
        //     }
        // }
    );
}