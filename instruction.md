### Instruction of how to start unit-test for login function

#### Prerequisite
+ Have User pool and Identity Pool in AWS Cognito be ready to use
+ Add the atrributes to src/aws-exports.js
    + You will need "aws_project_region", "aws_cognito_identity_pool_id", "aws_cognito_region","aws_user_pools_id", and "aws_user_pools_web_client_id"
+ Run following commands:
    + npm i (to install react)
    + npm i aws-amplify (to activate amplify/cognito)
+ Add usable email, username, and password to test unit-test (put it in at unit_test.py, line 14,15,16)

#### Procedure to start testing
+ open terminal and run "npm run start" in project's relative folder
+ then run "python3 unit_test.py" to test

#### Features in Unit Test
1. Normal sign up test
2. Sign up test using existing account
3. Login test with unverified account
4. Login test with wrong credential
5. Normal Login test
6. Login state remain test

#### Some Insights
+ It was unable to test change password test due to AWS Cognito does not allow to control over verification link / code (need verification code / email link to change password)
    + Tested manually, and worked perfect