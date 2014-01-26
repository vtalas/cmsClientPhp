var Animator = (function () {

	function Animator(selector) {
		this.svg = d3.select(selector)
			.append("svg")
			.attr("width", 1000)
			.attr("height", 1000);

		this.duration = 500;
		var self = this;
		this.r = 200;
		this.x = 0;
		this.y = 0;

		this.xx();

//		var rect = this.svg.append("rect")
//			.style("fill", "#eee")
//			.on("click", function () {
//				console.log(self.timer);
//			})
//			.attr("x", 900)
//			.attr("y", this.y)
//			.attr("width", 2 * this.r)
//			.attr("height", 2 * this.r);


		this.circle
			.on("mouseenter", function () {
				clearTimeout(self.timer);
				if (self.timer > 0) {
					return;
				}
				self.animate1(self.circle);
				self.timer = -1;
			})
			.on("mouseout", function () {
				self.setTimer();
			});
	}

	Animator.prototype.xx = function () {
		var node = this.svg.append("g");
		this.circle = node.append("circle")
			.style("fill", "green");

		node.append("text")
			.attr("x", this.x + this.r)
			.attr("y", this.y + this.r)
			.style("text-anchor", "middle")
			.style("fill", "red")
			.text("XXX jjj XX");

		this.startState(this.circle);

		return node;
	};

	Animator.prototype.setTimer = function () {
		var self = this;

		if (this.timer > 0) {
			clearTimeout(this.timer);
		}

		this.timer = setTimeout(function () {
			console.log("----------", self.timer);
			self.svg.selectAll(".xxx")
				.transition()
				.duration(self.duration)
				.style("fill-opacity", 0)
				.attr("r", 10)
				.attr("r", self.r / 4)
				.attr("cx", self.x + self.r)
				.attr("cy", self.y + self.r)
				.transition()
				.style("display", "none")
			;
			self.startState(self.circle);
			self.timer = -1;
		}, 2000);

	};
	Animator.prototype.startState = function (circle) {
		circle
			.attr("r", this.r / 3)
			.attr("cx", this.x + this.r)
			.attr("cy", this.y + this.r)
			.transition()
			.duration(this.duration + 300)
			.style("fill-opacity", 1)
			.attr("r", this.r)
		;
		return circle;
	};

	Animator.prototype.animate1 = function (elem) {
		var rpul = this.r / 2;
		elem
			.transition()
			.attr("r", rpul)
			.style("fill-opacity", 0)
			.transition()
			.style("display", "none");

		var x = d3.selectAll(".xxx");

		if (x[0].length > 0) {
			var list = x[0];
			console.log("xxx");
			d3.select(list[0]).transition().style("display", "block").duration(500).attr("r", rpul).style("fill-opacity", 1).attr("cx", this.x + rpul).attr("cy", this.y + rpul);
			d3.select(list[1]).transition().style("display", "block").duration(500).attr("r", rpul).style("fill-opacity", 1).attr("cx", this.x + rpul).attr("cy", this.y + 3 * rpul);
			d3.select(list[2]).transition().style("display", "block").duration(500).attr("r", rpul).style("fill-opacity", 1).attr("cx", this.x + 3 * rpul).attr("cy", this.y + 3 * rpul);
			d3.select(list[3]).transition().style("display", "block").duration(500).attr("r", rpul).style("fill-opacity", 1).attr("cx", this.x + 3 * rpul).attr("cy", this.y + rpul);
			return;
		}

		this.smallCircle(this.x + rpul, this.y + rpul, "red");
		this.smallCircle(this.x + rpul, this.y + 3 * rpul, "green");
		this.smallCircle(this.x + 3 * rpul, this.y + 3 * rpul, "pink");
		this.smallCircle(this.x + 3 * rpul, this.y + rpul, "pink");
	};

	Animator.prototype.smallCircle = function (cx, cy, color) {
		var self = this;
		var node = this.svg.append("g");

		node.append("a")
			.attr("xlink:href", function (d) {
				return "http://somelink.com/link.php?id=" + d
			})
			.append("circle")
			.style("text-anchor", "middle")
			.style("fill", color)
			.on("mouseover", function () {
				clearTimeout(self.timer);
			})
			.on("mouseout", function () {
				self.setTimer();
			})
			.attr("class", "xxx")
			.attr("r", this.r / 6)
			.attr("cx", this.x + this.r)
			.attr("cy", this.y + this.r)
			.style("fill-opacity", 0)
			.transition()
			.duration(this.duration)
			.style("fill-opacity", 1)
			.attr("r", this.r / 2)
			.attr("cx", cx)
			.attr("cy", cy)
	};

	return Animator;
}());




