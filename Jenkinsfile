def config = [
   'domain': 'itrust',
   'name': 'itrust-auth-widget',
   'appname': 'itrust-auth-widget',
   'appdomain': 'itrust',
   'mailTo': 'Soundar.Mannathan@CVSHealth.com',
   "checkmarx": [
      "team": "Retail",
      "exclusions": "",
      "waitForResults": "true"
   ]
]


def notifyBuild() {
    // Default values
    String subject = "Jenkins CICD- ${currentBuild.currentResult}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    String details = """
    Job Name - ${env.JOB_NAME} \n
    Build Number - ${env.BUILD_NUMBER} \n
    Status - ${currentBuild.currentResult} \n
    Jenkins Console Output - ${env.BUILD_URL} \n \n
    This is test build notification. \n\n\n
    """
    String mailTo = 'Soundar.Mannathan@CVSHealth.com'
    emailext (
      subject: subject,
      body: details,
      recipientProviders: [developers(), requestor()],
      to: mailTo      
    )
}

pipeline {
    agent any

    environment {
        uname = credentials('HarborUsername')
        passwd  = credentials('HarborPassword')
        Server = "harbor.incubation.aetna.com"
    }
    
    stages {

   		stage('GIT Checkout') {
            steps {
                    cleanWs deleteDirs: true
                    checkout(
                            [
                                $class: 'GitSCM',
                                branches: [[name: '*/main']],
                                doGenerateSubmoduleConfigurations: false,
                                extensions: [],
                                gitTool: 'Default',
                                submoduleCfg: [],
                                userRemoteConfigs: [
                                    [
                                        credentialsId: 'f0d2ec0e-a393-46b5-be1f-151beaa6fdaf',
                                        url: 'https://gitw.cvshealth.com/tai-lab-incubation/digital-identity/itrust-auth-widget.git'
                                    ]
                                ]
                            ]
                        )
            }
        }        
        
        stage('Get Release version') {
            steps {
                script {
                    env.RELEASE_VERSION = sh (
                        script: 'node -e "console.log(require(\'./package.json\').version);"',
                        returnStdout: true
                    ).trim()
                }
            }            
        }      

        stage('Build Docker Image') {
            steps   {
            	sh "docker build -t ${config.appdomain}/${config.appname} .  --build-arg BUILD_FOR=prod --build-arg http_proxy=http://eastproxies.cvshealth.com:8080 --build-arg https_proxy=http://eastproxies.cvshealth.com:8080" 
                sh "docker tag ${config.appdomain}/${config.appname}:latest ${Server}/${config.appdomain}/${config.appname}:${RELEASE_VERSION}"
                sh "docker tag ${config.appdomain}/${config.appname}:latest ${Server}/${config.appdomain}/${config.appname}:latest"
            }
        }

        stage('Docker Push Harbor') {
            steps   {
                sh "docker login ${Server} --username ${uname} --password ${passwd}"
                sh "docker push ${Server}/${config.appdomain}/${config.appname}:${RELEASE_VERSION}" 
                sh "docker push ${Server}/${config.appdomain}/${config.appname}:latest"  
            }
        }

        stage('Trigger Docker Deployment') {
            steps   {
                 withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'Lab-Service-Account', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh '''
                    sshpass -p $PASSWORD -v ssh -tt $USERNAME@10.254.246.216 -o StrictHostKeyChecking=accept-new "/srv/itrust/itrust-infrastructure/docker/deploy-script.sh"
                    '''
                }
            }
        }       
        
    }

}
