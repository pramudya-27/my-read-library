pipeline {
    agent any
    tools {
        nodejs "nodejs24"
    }
    stages{
        stage('Build'){
            steps{
                sh 'npm install'
            }
        }
        stage('Test'){
            steps{
                sh 'npm test -- --watchAll=false'
            }
        }
        stage('Build Production'){
            steps{
                sh 'npm run build'
            }
        }
    }
}