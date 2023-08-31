# REAN Platform Deployment Workflows

## PR-CI-CD

**Mode of Trigger:** Automated

The PR Workflow is triggered automatically whenever a Pull Request with a source branch as a `feature/*` branch is created against the target branch as the `develop` branch.

### Release Process Workflow Diagram
![PR-ci-cd_workflow](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/pr-ci-cd_workflow.png?raw=true)

### GitHub Action Workflow Run
![pr](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/Pr-ci-cd_example.png?raw=true)

### Jobs

The PR workflow consists of two jobs:

#### CodeScan-ESLint
In this job, we analyze the code written by developers against predefined rules to identify stylistic or programmatic errors.

* This job uses the [Super-linter](https://github.com/marketplace/actions/super-linter) action.
* It employs a static code analysis tool to identify problematic patterns in the application's source code.

#### Build-Docker-Image
This job validates the Dockerfile and tests the image build process to detect issues that might arise due to recent code changes.

* This job uses [docker/build-push-action](https://github.com/marketplace/actions/build-and-push-docker-images).
* It creates a Docker image with an image tag using the branch name and short SHA of the commit, for example, `feature/test_5e38e33`.

## Dev-CI-CD

**Mode of Trigger:** Automated

The Dev Workflow is triggered automatically whenever any Pull Request is merged into the `develop` branch. This workflow involves building the applications and deploying the changes to the RF Platform Development environment.

### Release Process Workflow Diagram
![Dev-ci-cd_workflow](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/dev-ci-cd_workflow.png?raw=true)

### GitHub Action Workflow Run
![dev](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/Dev-ci-cd_example.png?raw=true)

### Jobs

#### Deploy-ECS
The Deploy ECS job performs the following steps:

* This job uses [docker/build-push-action](https://github.com/marketplace/actions/build-and-push-docker-images).
* It operates within the 'dev' environment and logs into ECR using credentials. It builds a new ECR Docker image with an image tag using the branch name and short SHA of the commit, for example, `/sneha-rahi:develop_5e38e33`.
* Subsequently, it creates a new version of the Amazon ECS task definition with the updated Docker image and deploys the Amazon ECS task definition using the Duplo API.

## PROD-CI-CD

**Mode of Trigger:** Automated

The Prod Workflow is triggered automatically whenever any Pull Request is merged into the main branch. This workflow involves building the applications and deploying the changes to the RF Platform Production environment.

### Release Process Workflow Diagram
![prod-ci-cd_Workflow](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/PROD-ci-cd_workflow.png?raw=true)

### GitHub Action Workflow Run
![prod](https://github.com/REAN-Foundation/reancare-service/blob/develop/assets/images/prod-ci-cd_example.png?raw=true)

### Jobs

#### Publish-Release
The Publish-Release job performs the following steps:

* This job uses [release-drafter](https://github.com/release-drafter/release-drafter).
* It creates a new GitHub release, and the versioning is based on the label assigned by the developer to the pull request.

#### Deploy-ECS
The Deploy-ECS job performs the following steps:

* This job uses [docker/build-push-action](https://github.com/marketplace/actions/build-and-push-docker-images).
* It logs into ECR using credentials and builds a new ECR Docker image with an image tag using the ID of the release created by the Publish-Release job, for example, `sneha-prod:97777323`.
* Subsequently, it creates a new version of the Amazon ECS task definition with the updated Docker image and deploys the Amazon ECS task definition using the Duplo API.