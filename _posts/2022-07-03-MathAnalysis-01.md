---
title: 数学分析回炉再造（1）
date: 2022-06-30
categories: [数学分析，多元函数微积分]
tags: [数学分析]     # TAG names should always be lowercase
math: true
mermaid: true
---
# 多元函数微分学
## $\mathbb{R}^m$中的向量结构
### $\mathbb{R}^m$是向量空间
如果在$\mathbb{R}^m$中按照公式
$$x_1 + x_2 = (x_1^1 + x_2^1, \dots, x_1^m + x_2^m)$$
引入元素$x_1 = (x_1^1, \dots, x_1^m)$ 与 $x_2 = (x_2^1, \dots, x_2^m)$的加法运算，按照公式
$$\lambda x = (\lambda x^1, \dots, \lambda x^m)$$
引入元素$x_1 = (x_1^1, \dots, x_1^m)$与数$\lambda\in \mathbb{R}$的乘法运算，则$\mathbb{R}^m$成为实数域上的向量空间，它的点现在可以称为向量。
基向量$e_i = (0, \dots, 0, 1, 0, \dots, 0) \quad (i = 1, \dots, m)$组成这个空间最大的线性无关向量组，座椅$\mathbb{R}^m$成为*m维向量空间*。

任何向量都可以按照基向量分解。即表示为
$$x = x^1e_1 + \dots + x^me_m$$
的形式。

我们约定，用下标表示向量，用上标表示坐标。这样的写法有很多便利之处，比如可以把上述的表达式简写为
$$x = x^ie_i$$
并且认为**相同的上标与下标表示在其变化范围内求和**。这样的求和约定是由爱因斯坦提出的。
### 线性映射 L: $\mathbb{R}^m \rightarrow \mathbb{R}^n$
向量空间X到向量空间Y的映射$L: X \rightarrow Y$称为*线性映射*。

如果$\{e_1, \dots, e_m\}$和$\{\widetilde{e}_1, \dots, \widetilde{e}_n\}$分别是$\mathbb{R}^m$和$\mathbb{R}^n$的给定基向量，则只要知道基向量在线性映射$L:\mathbb{R}^m \rightarrow \mathbb{R}^n$下的项的分解式
$$L(e_i) = a_i^1\widetilde{e}_1 + \dots + a_n^1\widetilde{e}_n = a_i^j\widetilde{e}_j \quad (i = 1, \dots, m)$$
根据变换$L$的线性性质就可以求出任何向量$h = h^1e_1+h^2e_2+\dots+h^me_m=h^ie_i$的项$L(h)$对基向量$\{\widetilde{e_1}, \dots, \widetilde{e_n}\}$的分解式，即
$$L(h) = L(h^ie_i) = h^iL(e_i) = h^ia_i^j\widetilde{e}_j = a_i^jh^i\widetilde{e}_j$$
于是，在坐标形式下：
$$L(h) = (a_i^1h^i, \dots, a_i^nh^i)$$
因此，只要在$\mathbb{R}^n$中给出固定的基向量，就可以认为映射$L: \mathbb{R}^m \rightarrow \mathbb{R}^n$是由$n$个（坐标）映射$L^j: \mathbb{R}^m\rightarrow\mathbb{R}$组成的有序数组
$$L = (L^1, \dots, L^n)$$
我们可以断定，映射$L: \mathbb{R}^m \rightarrow \mathbb{R}^n$是线性的充分必要条件是所有的映射$L^j$都是线性的。

如果在$\mathbb{R}^n$中有向量空间的结构，就可以讨论映射$f_1: X\rightarrow\mathbb{R}^n$与$f_2: X\rightarrow\mathbb{R}^n$的线性组合$\lambda_1f_1 + \lambda_2f_2$，即
$$(\lambda_1f_1 + \lambda_2f_2)(x) := \lambda_1f_1(x) + \lambda_2f_2(x)$$
特别的，根据这些定义，线性映射的线性组合是线性映射。线性映射与线性映射的复合也是线性映射。该复合映射是两个矩阵之积，显然也是线性映射。
### $\mathbb{R}^m$中的范数
数值
$$||x|| = \sqrt{(x^1)^2 + \dots + (x^m)^2}$$
称为向量$x = (x^1, \dots, x^m) \in \mathbb{R}^m$的范数。