output "vm_internal_ip" {
  description = "Internal IP address of the VM"
  value       = google_compute_instance.vm.network_interface[0].network_ip
}

output "vm_external_ip" {
  description = "External IP address of the VM"
  value       = try(
    google_compute_instance.vm.network_interface[0].access_config[0].nat_ip,
    null
  )
}

output "vm_self_link" {
  description = "Self link of the VM"
  value       = google_compute_instance.vm.self_link
}

output "ssh_command_full" {
  description = "Full SSH command with project and zone"
  value = "gcloud compute ssh ${google_compute_instance.vm.name} --project ${var.project_id} --zone ${google_compute_instance.vm.zone}"
}
