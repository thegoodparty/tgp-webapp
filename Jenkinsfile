pipeline {
  agent any
  tools {
    nodejs "node 12"
  }
  environment {
    BUILD_DIR             = 'build'
    GIT_COMMIT_AUTHOR     = ""
    GIT_COMMIT_SHA        = ""
    GIT_DESC              = ""
    DEVELOP_BRANCH        = "develop"
    EB_ENV                = "tgp-site-dev"
    PROD_BRANCH           = "master"
    EB_PROD               = "tgp-site"
  }
  stages {
    stage('deploy to develop') {
      steps {
        sh '/var/lib/jenkins/aws --version'
        sh '/var/lib/jenkins/eb --version'
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: '	244a4e80-3587-40cb-bcf0-dbe5321fc1bf', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
          sh '/var/lib/jenkins/aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile eb-cli'
          sh '/var/lib/jenkins/aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile eb-cli'
        }
      }
    }
    stage('setup application dependencies') {
      steps {
        sh '#!/bin/bash'
        sh 'node --version'
        sh 'yarn --version'
        sh 'yarn --version'

        sh 'yarn'
      }
    }
    // stage('deploy to develop') {
    //   when {
    //     branch DEVELOP_BRANCH
    //   }
    //   steps {
    //     sh '/var/lib/jenkins/eb deploy $EB_ENV'
    //   }
    // }
    // stage('deploy to staging') {
    //   when {
    //     branch STAGING_BRANCH
    //   }
    //   steps {
    //     sh '/var/lib/jenkins/eb deploy $EB_STAGING'
    //   }
    // }
    // stage('deploy to production') {
    //   when {
    //     branch PROD_BRANCH
    //   }
    //   steps {
    //     sh '/var/lib/jenkins/eb deploy $EB_PROD'
    //   }
    // }
  }
  // post {
  //   failure {
  //     script {
  //       GIT_COMMIT_SHA = sh(returnStdout: true, script: 'git rev-parse HEAD')
  //       GIT_COMMIT_AUTHOR = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' $GIT_COMMIT_SHA").trim()
  //       GIT_DESC = sh(returnStdout: true, script: 'git log --format="commit %H%nauthor %an <%aE>%n%n%B" -1').trim()
  //     }
  //     slackSend (color: '#ff0000', channel: "jenkins-ci", message: "*$JOB_NAME #$BUILD_NUMBER deploy FAILURE!*\n\n```$GIT_DESC```\n:point_right: <$BUILD_URL|$JOB_NAME>")
  //   }
  //   success {
  //     script {
  //       GIT_COMMIT_SHA = sh(returnStdout: true, script: 'git rev-parse HEAD')
  //       GIT_COMMIT_AUTHOR = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' $GIT_COMMIT_SHA").trim()
  //       GIT_DESC = sh(returnStdout: true, script: 'git log --format="commit %H%nauthor %an <%aE>%n%n%B" -1').trim()
  //     }
  //     slackSend (color: '#BDFFC3', channel: "jenkins-ci", message: "*$JOB_NAME #$BUILD_NUMBER deploy done!*\n\n```$GIT_DESC```\n:point_right: <$BUILD_URL|$JOB_NAME>")
  //   }
  // }
}
