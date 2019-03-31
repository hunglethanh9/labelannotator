# Radiology / Pathology Annotation Tool for WebBrowser

## Demo
Click this [link](https://app.trainingdata.io/v1/radiology/?task=69&project=29) to access working demo. 
[Login here](https://app.trainingdata.io/v1/td/login) to see sample datasets.

## Advanced Features
  - Multi-planar view
  - Superpixel color based segmentation for PNG & Dicom
  - 2d-Growth Tool for Dicom
  - 3d-Growth Tool for Dicom
  - HIPAA compliant cloud backend

## Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
 - [Npm](https://www.npmjs.com/)

## Getting Started

Install dependencies:
```bash
npm install
```

Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
gulp server
```
Browse to http://localhost:8000

## Replace dataset with your Dicom / PNG files
You can do annotations for your dataset by replacing JSON formatted study description in file:'/private/project' 
