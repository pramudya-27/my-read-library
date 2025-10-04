pipeline {
    agent{
        docker {
            image 'node:16-buster-slim'
            args '-p 3000:3000'
        }
    }
    stages{
        ('Build'){
            steps{
                sh 'npm install'
            }
        }
    }
}