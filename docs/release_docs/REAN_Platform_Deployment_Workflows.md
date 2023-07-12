# REAN Platform Deployment workflows

## PR-CI-CD
Mode of trigger: ```Automated```

 PR Workflow is triggered automatically whenever a PR with a source branch as a feature/* branch is created against the target branch as develop branch.
 
 Release Process Workflow Diagram.
 ![PR-ci-cd_workflow](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/pr-ci-cd_workflow.png?raw=true)
 
 GitHub Action Workflow run.
 ![pr](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/Pr-ci-cd_example.png?raw=true)
 
### JOBS

 The PR workflow uses TWO jobs:
 
 #### CodeScan-ESLint
  In this job, we analyze the code developer wrote against some rules for stylistic or programmatic errors.
 
  * This job uses [Super-linter](https://github.com/marketplace/actions/super-linter) action to run this job. 
  * This job uses a static code analysis tool that identifies problematic patterns found in application source code.
 
 #### Build-Docker-Image
 In this job, we validate the Dockerfile and test the image build process to identify any issues incurred in the build process to recent code changes.
 
 * This job uses [docker/build-push-action](https://github.com/marketplace/actions/build-and-push-docker-images).  
 * This job creates a docker image with an image tag using the branch name and short SHA of commit for example ``` feature/test_5e38e33```



## Dev-CI-CD
Mode of trigger: ```Automated```

Dev Workflow is triggered automatically whenever any PR is merged into the develop branch. The workflow builds the applications and deploys the changes to the RF Platform Development environment.

Release Process Workflow Diagram.
![Dev-ci-cd_workflow](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/dev-ci-cd_workflow.png?raw=true)

GitHub Action Workflow run.
![dev](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/Dev-ci-cd_example.png?raw=true)

### JOBS

#### Deploy-ECS
The Deploy ECS will be performing the following steps

* This job uses [docker/build-push-action](https://github.com/marketplace/actions/build-and-push-docker-images).
* This job uses 'dev' environment and login to ECR using creds and builds a new ECR docker image with image tag using branch name and short SHA of commit for example ``` /sneha-rahi:develop_5e38e33 ```
* Then it will create a new version of the Amazon ECS task definition with a new docker image and deploy the Amazon ECS task definition using Duplo API.

## PROD-CI-CD
Mode of trigger: ```Automated```

Prod Workflow is triggered automatically whenever any PR is merged into the main branch. The workflow builds the applications and deploys the changes to the RF Platform Production environment.

Release Process Workflow Diagram.
![prod-ci-cd_Workflow](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/PROD-ci-cd_workflow.png?raw=true)

GitHub Action Workflow run.
![prod](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/prod-ci-cd_example.png?raw=true)

### JOBS

#### Publish-Release
The Publish-Release will be performing the following steps.

* This job uses [release-drafter](https://github.com/release-drafter/release-drafter).
* This job will create a new GitHub release and the versioning will be based on what label the developer gave for the pull request.

#### Deploy-ECS
The Deploy-ECS will be performing the following steps.

* This job uses [docker/build-push-action](https://github.com/marketplace/actions/build-and-push-docker-images).
* This job login to ECR using creds and builds a new ECR docker image with image tag using the ID of release which Publish-Release job created for example ``` sneha-prod:97777323 ```.
* Then it will create a new version of the Amazon ECS task definition with a new docker image and deploy the Amazon ECS task definition using Duplo API.
