pipeline {
    agent any

    stages {
        stage('Stop Previous Containers') {
            steps {
                sh 'docker-compose down || true'
            }
        }

        stage('Build & Run') {
            steps {
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline done.'
        }
    }
}
