pipeline {
    agent any
    tools {
        nodejs "nodejs16"
    }
    stages{
        stage('Build'){
            steps{
                sh 'npm install'
            }
        }
        stage('Test'){
            steps{
                sh ''
            }
        }
        stage('Build Production'){
            steps{
                sh 'npm run build'
            }
        }
    }
}