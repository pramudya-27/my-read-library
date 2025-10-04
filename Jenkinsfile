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
                sh 'npm test -- --watchAll=false --coverage'
                sh 'rm -rf coverage'
            }
        }
        stage(('Deploy')){
            steps{
                sh '''
                    set -x
                    npm start &
                    sleep 1
                    echo $! > .pidfile
                    set +x
                '''
                echo 'Now...'
                echo 'Visit http://localhost:3000 to see your Node.js/React application in action.'
                input message: 'Finished using the website? (Click "Proceed" to continue)'
                sh '''
                    set -x
                    kill `cat .pidfile`
                    rm .pidfile
                    set +x
                '''
            }
        }
    }
}