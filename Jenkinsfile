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
        stage(('Deploy')){
            steps{
            sh 'echo "Deploying application..."'
            sh './scripts/deliver.sh'
            input message : 'Finished using the website? (Click "Proceed" to continue)'
            sh './scripts/kill.sh'
            }
        }
    }
}