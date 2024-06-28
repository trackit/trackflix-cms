# ⚙️ Trackflix CMS

Empower your content management with TrackFlix CMS, designed to effortlessly handle live and VOD channels. Elevate your platform’s performance through genre and category configuration, user rights management, ans insightful analytics for data-driven insight

# 🚀 Getting started with TrackFlix CMS

TrackFlix CMS was built using Strapi. It comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start TrackFlix application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start TrackFlix application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```
# Deploying Trackflix CMS to Amazon EC2
### Create AWS VPC    
* From your AWS Management Console and as your regular user​ 
  * Find Services, search for VPC and click on EC2, Isolated Cloud Resources
* Select Appropriate Region:​
In the top menu, near your IAM Account User name, select, from the dropdown, the most appropriate region to host your Strapi project. For example, US East (N.Virginia) or Asia Pacific (Hong Kong). You will want to remember this region for configuring other services on AWS and serving these services from the same region.
* Click on the orange Create VPC button​:
  * Select VPC and More
  * Select Auto-generate nametags. Add a suitable name, e.g. strapi-vpc.
  * Leave IPv4 CIDR block as 10.0.0.0/16 (unless you have a specific reason to change it).
  * Leave Tenancy as Default.
  * Select 2 for Number of Availability Zones (AZs)
  * Select 2 for Number of Public Subnets
  * Select 2 for Number of Private Subnets
  * Select 0 for NAT gateways. ::: tip If you know that you will need to scale your project, you can increase the number of subnets and NAT gateways. For example, if you are expecting a large number of users, you may want to increase the number of private subnets and NAT gateways. For more information, see VPC and Subnet Sizing. 
  * Select S3 Gateway for VPC Endpoints.
  * Check Enable DNS hostnames and Enable DNS resolution.
  * Select Create VPC.
### Create AWS AMI Role
* Go to the IAM service on your AWS dashboard.
* On the sidebar, choose Roles.
* Choose “create role”. 
* Trusted Type entity: Choose AWS Service
* Use Case: Choose EC2 then classic EC2 use case.
* Click Next
* Permissions: search then choose “AmazonS3FullAccess”
* Click next and choose the Name you want for your role.
### Create EC2 instance
* Click on the Launch Instance button
* Choose a name and add tags as desired
* Application and OS Images: 
  * Choose Ubuntu as OS 
  * Choose Ubuntu Server 22.04 LTS (HVM), SSD Volume Type as version
* Choose Instance Type:
  * t2.small is the smallest instance type that can run Strapi, t2.medium will be more stable and fast on deployment.
* Key pair (login):
  * Choose a key you are already in possession of or create and download a new one.
* Network settings:
  * Choose the VPC you have created in the previous step 
  * Create a new security group 
  * Allow SSH from anywhere

* Configure storage:
  * 1x 8 Gb, gp3 should be enough as we don’t store anything on the EC2.

* Advanced details:
  * Click on IAM instance profile Info
  * Choose the role we created in the previous step
* Finally, click on the Launch instances button.
### Configure S3 for image hosting
In the top menu, click on Services and do a search for s3, click on Scalable storage in the cloud.
Click on Create bucket button:
* Give your bucket a unique name, under Bucket name, e.g. my-project-name-images.
* Select the most appropriate region.
* Click Next.
* Configure any appropriate options for your project in the Configure Options page, and click next.
* Under Block public access:
  * Uncheck Block all public access and set the permissions as follows:
    * Uncheck Block new public ACLs and uploading public objects (Recommended)
    * Uncheck Block public access to buckets and objects granted through any access control lists (ACLs)
    * Check Block public access to buckets and objects granted through new public bucket policies
    * Check Block public and cross-account access to buckets and objects through any public bucket policies
    * Select Do not grant Amazon S3 Log Delivery group write access to this bucket.
* Click Next.
* Review and click Create bucket
### Create RDS instance
* Click Create database button
* Select engine: PostgreSQL
* Choose use case: as you like
* Specify DB details:
  * DB engine version: PostgreSQL 10.x-R1
  * DB instance class: db.t2.micro
  * Multi-AZ deployment: No
  * Storage: General Purpose (SSD), 20 GB
  * DB instance identifier: as you like
  * Master username: as you like
  * Password: as you like
* Configure advanced settings
   * Public accessibility: Yes (that's why you need a super strong password)
   * Database name: strapi
   * Monitoring & Maintenance window: choose an idle period in your timezone
   * Click Create database button
* Instance Details panel - Security groups
  * Edit inbound rules: PostgreSQL (5432) - Anywhere
* Create databases for dev & staging modes (GUI recommend)
  * Development mode: strapi_dev
  * Staging mode: strapi_staging
  * Production mode: strapi (already exists)

### Configure EC2 as a Node.js server:
* Setup the .pem file:
  * $ mv key-pair-name.pem ~/.ssh/
  * $ chmod 400 ~/.ssh/key-pair-name.pem
* Log in to your server as the default ubuntu user:
  * $ ssh -i ~/.ssh/key-pair-name.pem ubuntu@<ec2-public-ip>
  * $ sudo apt update
* Nodejs installation: 
  * Install nvm:
     * nvm install 16.20.2
     * nvm use 16.20.2
  * Install Yarn (package manager) and PM2 (process manager):
     * Npm install -g yarn #package manager, seems more stable than npm
     * Npm install -g pm2 #process manager, to handle logs storage and server status updates.

* Nginx configuration:
     * Sudo apt-get install nginx
     * Sudo systemctl enable –now nginx
     * Replace default config at /etc/nginx/nginx.conf by the following config https://pastebin.com/bbVU7nSc (config file link)
	 * Sudo nginx -t # test if the config doesn’t contains any error
* SSL config:
     * Sudo apt-get install certbot
     * Sudo apt-get install python3-certbot-nginx
     * Sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
     * Add a cron job to regenerate the certificate everyday at noon as it expire at a certain time crontab -e
     * Choose your favorite editor then add the following line to the file:0 12 * * * /usr/bin/certbot renew --quiet

Nginx is now setup including SSL certificate
### Deploy from GitHub
You will next deploy the Trackflix CMS project to your EC2 instance by cloning it from GitHub.
From your terminal and logged into your EC2 instance as the ubuntu user:
* git clone git@github.com:trackit/trackflix-cms.git
* yarn #install the dependencies
* yarn create-env #generate .env with new random safe tokens

Modify the .env file with your database configuration. If not done, redirect to a readme section explaining how to create the database.
Available DB systems are MySQL and PostgreSQL.
```db
DATABASE_CLIENT=postgres_or_mysql
DATABASE_HOST=your_database_host
DATABASE_PORT=5432 # or any other
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password
DATABASE_SSL=false
```
* App keys
The app keys (JWT tokens and other security strings) are automatically generated and changing them isn’t mandatory.


# 👨‍💻 Features
## 🎬 Live Channel

**Create New Entry**: Easily create a new Live Channel with a user-friendly interface. Customize it by choosing the input type, name, thumbnail, output type, genre, and category. Save your configuration for quick setup.

**Search**: Utilize the search feature to find a specific live channel quickly. No need to scroll through a long list—just search and access the channel you're looking for.

**Filters**: Enhance your search experience with filters. Set up filters to narrow down your search and pinpoint the live channel you want more efficiently.

**Edit**: Customize your Live Channel effortlessly. Modify channel details, including its name, input and output formats, thumbnail, genre, and category. Furthermore, you can configure advanced settings like enabling live-to-VOD or catch-up options for a tailored streaming experience.

## 🎥 VOD Channel
**Create New Entry**: Seamlessly generate new VOD content with this option. Click to open a pop-up window where you can define input type, name, thumbnail, output type, and assign genre and category tags.

**Search**: Access a dedicated search section to efficiently locate specific VOD content. No more sifting through a vast library; find what you need with ease.

**Filters**: Organize and streamline your content catalog within your Content Management System (CMS) using filters. Fine-tune your search results for better content management.

**Edit**: Customize your VOD content effortlessly. Edit the displayed name, thumbnail, content type, available start and end times, and even add or modify descriptions to keep your content catalog up-to-date.


## 🗃️ Genre
Manage and create Genres with this page.
### Edit
Customize your genre by modifying its name or associating it with a category.
## 🗃️ Category
Manage and create Categories with this page.
### Edit
Customize your category by modifying its name or associating it with a genre.

## 📊 Metrics

The metrics section is designed to provide valuable insights into your user base and contribute to the overall prosperity of your platform. Below, you will find a breakdown of the available metrics and their respective benefits
* **Up-time** : 
This measures the time the broadcasting service is available without interruption. Higher up-time indicates more reliable service, leading to better viewer satisfaction.
* **Latency** :
It indicates the delay before data starts transferring. Lower latency means less delay in receiving the broadcast, crucial for live events.
* **Error rate** :
This measures the frequency of errors, such as transmission errors or downtime. Lower error rates can lead to a more reliable viewing experience, reducing frustration caused by interruptions or glitches.
* **Service Availability** :
This refers to the ability of viewers to access the service when they want to. High service availability can improve viewer satisfaction and loyalty.
* **Broadcast Quality**
Metrics such as bit rate, resolution, and frame rate can be deployed to evaluate the caliber of broadcasts. Superior broadcast quality can enrich the viewing experience.
* **Average view duration** :
It’s the average amount of time viewers spend watching a particular live or VOD. 
* **Watch Time** : 
It’s the total amount of time a specific viewer spend watching a particular live or VOD.
* **Views** : 
The views metrics shows how many time a particular video or broadcast has been watched.
* **User Interaction** :
User interaction show data related to how viewers engage with contents
* **Devices** :
This metric tracks the devices and platforms viewers use to access content
* **User preferences** :
It refer to the specific choices, interest, and preferences of viewers when it comes to content

## 👩‍💻 User

The user management page enables you to effortlessly create a user and efficiently oversee their username, email, password, and, most notably, their role
