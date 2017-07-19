# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # I am using bento/ubuntu because of a bug in ubuntu/xenial64
  # info: https://bugs.launchpad.net/cloud-images/+bug/1569237
  config.vm.box = "bento/ubuntu-16.04"
  config.vm.box_check_update = true

  ## NETWORKING SETTINGS
  config.vm.network "forwarded_port", guest: 80, host: 3000, host_ip: "127.0.0.1", auto_correct: true
  # config.vm.network "private_network", ip: "192.168.33.10"
  # config.vm.network "public_network"

  config.vm.synced_folder ".", "/vagrant"

  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    # vb.gui = true
    # Customize the amount of memory on the VM:
    vb.memory = "3072"
  end

  ## Use Ripple QEWD Redis installer
  config.vm.provision :shell, inline: "source /vagrant/installer/install_ripple_redis.sh"
end
