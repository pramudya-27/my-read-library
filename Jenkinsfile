pipeline {
    agent any
    tools {
        nodejs "NodeJS"
    }
    stages{
        stage('Build'){
            steps{
                sh 'npm install'
            }
        }
        stage('Test'){
            steps{
                sh 'npm test -- --coverage --ci --passWithNoTests'
            }
        }
        stage('Build Production'){
            steps{
                sh 'npm run build'
            }
        }
    }
}