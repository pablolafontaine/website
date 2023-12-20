---
title: "Setting up Arch Linux in WSL 2 for Development"
date: "May 25, 2022"
tags: "WSL, Linux, Productivity"
---

**Windows Subsystem for Linux 2** (WSL 2) allows you to install a Linux Distribution and run Linux binaries natively on Windows; all through the command line. A full Linux kernel in a managed VM without the need for large overhead from a full VM, nor the annoyance of having to dual-boot? Sounds too good to be true! Thankfully, it isn't. Furthermore, it's rather easy to set up. 🙂

&nbsp;

#### Why Arch Linux?

The distro I am personally familiar with and enjoy using is *Arch*. This is because of the minimalism and simplicity from the base installation. Furthermore, the package manager and AUR are nice to use and offer a large selection of packages to install with ease. 

For pure CLI-based workflow, Arch Linux seems to fit my needs well. It also helps that I am very familiar with it. 

## Requirements

According to Microsoft's documentation:

> To update to WSL 2, you must be running Windows 10...
> - For x64 systems: Version 1903 or later, with Build 18362 or later.
> - For ARM64 systems: Version 2004 or later, with Build 19041 or later.
>
> or Windows 11.

If you're on Windows 10, make sure you check your version!
Note: you **must** have virtualization enabled in your BIOS!

## Setup

#### Installing WSL2

First, we are going to enable the WSL feature for Windows.

*Open PowerShell as an admin* by:
- **Windows 10**: right-click start menu button -> PowerShell (Admin)
- **Windows 11**: right-click start menu button -> Windows Terminal (Admin)

Next, enter the command:

`dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`

and **restart** your machine.

Second, we have to install the [Linux kernel update package](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi). Once done, return to PowerShell and enter the command:

`wsl --set-default-version 2`

&nbsp;

#### Installing Arch Linux

1. Download Arch.zip from [here](https://github.com/yuk7/ArchWSL/releases/latest).
2. Extract the zip file to a directory with write perms. For example, do not extract it to `C:\Program Files`.
3. Run `Arch.exe`.

If everything worked so far, we should be in our new Arch install. There's still some setup to do, however.

&nbsp;

#### Setting up Pacman

Refresh GPG keys with the following commands:
```bash
pacman-key --init
pacman-key --populate
pacman-key --refresh-keys
pacman -Sy archlinux-keyring
```

and update your packages with:

`pacman -Syyu`

&nbsp;

Now, optionally you can install zsh—an improved bash with more features—instead of bash which I'd recommend. To do this, type:

`pacman -S zsh`

&nbsp;

Last, we have to **create a user**. To do this, we need to set up the sudoers file. Enter:

`echo "%wheel ALL=(ALL) ALL" > /etc/sudoers.d/wheel`

and

`useradd -m -G wheel -s /bin/zsh <username>`

*Replace /bin/zsh with /bin/bash if not using zsh!*

*Replace <username> with your desired username!*

Now, we can set a password for the user:
`passwd <username>`

And, finally, we can set that user as the default user.

1. Enter `exit`.
2. We have to `cd <path>` where <path> is where your `Arch.exe` is located. For example, mine is in `C:\Arch` and thus I type `cd C:\Arch`
3. Enter `Arch.exe config --default-user <username>`

## Conclusion

Congratulations! You now have a fully working and set up Arch Linux install integrated with Windows. To open it, just simply type: `wsl` in your PowerShell. If Arch is not your only distro, you may need to set it as default for `wsl` to work. This can be done with `wsl --setdefault arch`.

Enjoy! 😊
