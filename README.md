<a href="https://komiser.io">
  <img src="https://s3.eu-west-3.amazonaws.com/komiser-assets/images/logo.png" width="200" align="right" alt="Amp Logo">
</a>

<a href="https://komiser.io"><img alt="Amp" src="https://s3.eu-west-3.amazonaws.com/komiser-assets/images/icon.png" width="120" valign="middle"></a>

[![Price](https://img.shields.io/badge/price-FREE-0098f7.svg)](https://github.com/mlabouardy/komiser/blob/master/LICENSE) [![Docker Stars](https://img.shields.io/docker/pulls/mlabouardy/komiser.svg)](https://hub.docker.com/r/mlabouardy/komiser/) 
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![CircleCI](https://circleci.com/gh/mlabouardy/komiser/tree/master.svg?style=svg&circle-token=d35b1c7447995e60909b24fd316fef0988e76bc8)](https://circleci.com/gh/mlabouardy/komiser/tree/master) [![Go Report Card](https://goreportcard.com/badge/github.com/mlabouardy/komiser)](https://goreportcard.com/report/github.com/mlabouardy/komiser) [![Docker Stars](https://img.shields.io/github/issues/mlabouardy/komiser.svg)](https://github.com/mlabouardy/komiser/issues) [<img src="https://img.shields.io/badge/slack-@komiser-yellow.svg?logo=slack">](https://komiser.slack.com/messages/C9SQPU4Q0/)

Stay under budget by uncovering hidden costs, monitoring increases in spend, and making impactful changes based on custom recommendations.

**Discuss it on [Product Hunt](https://www.producthunt.com/posts/komiser) 🦄**

[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/fold_left.svg?style=social&label=Follow%20%40mlabouardy)](https://twitter.com/mlabouardy) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Optimize%20Cost%20and%20Security%20on%20AWS&url=https://github.com/mlabouardy/komiser&via=mlabouardy&hashtags=komiser,aws,gcp,cloud,serverless,devops)

**Highlights**

* Analyze and manage cloud cost, usage, security, and governance in one place.
* Control your usage and create visibility across all used services to achieve maximum cost-effectiveness.
* Detect potential vulnerabilities that could put your cloud environment at risk.
* Get a deep understanding of how you spend on the AWS, GCP and Azure.

<p align="center">

[![IMAGE ALT TEXT HERE](https://s3.eu-west-3.amazonaws.com/komiser-assets/images/thumbnail.png?v=2)](https://www.youtube.com/watch?v=DDWf2KnvgE8)

</p>

## Download

Below are the available downloads for the latest version of Komiser (2.0.0). Please download the proper package for your operating system and architecture.

### Linux:

```
wget https://cli.komiser.io/2.0.0/linux/komiser
```

### Windows:

```
wget https://cli.komiser.io/2.0.0/windows/komiser
```

### Mac OS X:

```
wget https://cli.komiser.io/2.0.0/osx/komiser
```

_Note_: make sure to add the execution permission to Komiser `chmod +x komiser`

### Docker:

```
docker run -d -p 3000:3000 -v $HOME/.aws/credentials:/root/.aws/credentials --name komiser mlabouardy/komiser:2.0.0
```

## How to use

### AWS

* Create an IAM user with the following IAM [policy](https://raw.githubusercontent.com/mlabouardy/komiser/master/policy.json):

```
wget https://komiser.s3.amazonaws.com/policy.json
```

* Add your **Access Key ID** and **Secret Access Key** to *~/.aws/credentials* using this format

``` 
[default]
aws_access_key_id = <access key id>
aws_secret_access_key = <secret access key>
region = <AWS region>
```

* That should be it. Try out the following from your command prompt to start the server:

```
komiser start --port 3000
```

* Point your browser to http://localhost:3000

<p align="center">
    <img src="https://s3.eu-west-3.amazonaws.com/komiser-assets/images/dashboard.png"/>
</p>

## Options

```
komiser start [OPTIONS]
```

```
   --port value, -p value      Server port (default: 3000)
   --duration value, -d value  Cache expiration time (default: 30 minutes)
   --redis value, -r value     Redis server (localhost:6379)
```

## Configuring Credentials

When using the CLI you'll generally need your AWS credentials to authenticate with AWS services. Komiser supports multiple methods of supporting these credentials. By default the CLI will source credentials automatically from its default credential chain.

* Environment Credentials - Set of environment variables that are useful when sub processes are created for specific roles.

* Shared Credentials file (~/.aws/credentials) - This file stores your credentials based on a profile name and is useful for local development.

* EC2 Instance Role Credentials - Use EC2 Instance Role to assign credentials to application running on an EC2 instance. This removes the need to manage credential files in production.

## Documentation

See our documentation on [docs.komiser.io](https://docs.komiser.io). The source repository for the documentation website is [komiserio/docs](https://github.com/komiserio/docs).

## Bugs and feature requests

Have a bug or a feature request? Please first read the issue guidelines and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/mlabouardy/komiser/issues/new).

## Roadmap and contributing

Komiser is written in Golang and is MIT licensed - contributions are welcomed whether that means providing feedback or testing existing and new feature.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/mlabouardy/komiser/tags). 
