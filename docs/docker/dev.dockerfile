FROM ubuntu:20.04

RUN sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y libusb-1.0-0-dev clang python3-opencv python3-pip clang-11 doxygen graphviz cmake git
RUN python3 -m pip install -U pip numpy when-changed

ENV CC clang-10
ENV CXX clang++-10
COPY docs/requirements.txt /build/
COPY docs/requirements_mkdoc.txt /build/
RUN python3 -m pip install -r build/requirements.txt
WORKDIR /build
