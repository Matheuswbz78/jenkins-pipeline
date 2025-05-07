pipeline {
    agent any 

    environment {
        DOCKER_HUB_USER = 'matheuswbz78' 
        IMAGE_WEB = "${DOCKER_HUB_USER}/web-app"
        IMAGE_REPORT = "${DOCKER_HUB_USER}/report-app"
    }

    stages {
        stage('Build e Push Docker Images') {
            steps {
                script {
                    // Build das imagens
                    sh 'docker build -t $IMAGE_WEB:latest ./web'
                    sh 'docker build -t $IMAGE_REPORT:latest ./report'

                    // Login no Docker Hub com token
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-tolken', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh 'docker push $IMAGE_WEB:latest'
                        sh 'docker push $IMAGE_REPORT:latest'
                    }
                }
            }
        }

        stage('Deploy com Docker Compose') { 
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
