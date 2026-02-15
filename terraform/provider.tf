terraform {
  required_version = ">= 1.14"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 7.16.0"
    }
  }

  backend "gcs" {
    bucket = "terraform-staging-state-bucket789" // for remote state and state locking
    prefix = "test/project"
  }
}

provider "google" {
  region  = var.region
  project = var.project_id
}
