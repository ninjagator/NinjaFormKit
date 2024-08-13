<script lang="ts">
	import '../app.css';
</script>

<nav class="bg-gray-800 p-4">
	<ul class="flex justify-around list-none m-0 p-0">
		<li>
			<a href="/" class="text-white no-underline p-2 block hover:bg-gray-600">Home</a>
		</li>
		<li>
			<a href="/contact" class="text-white no-underline p-2 block hover:bg-gray-600">Contact</a>
		</li>
		<li>
			<a href="/login" class="text-white no-underline p-2 block hover:bg-gray-600">Login</a>
		</li>
		<li>
			<a href="/register" class="text-white no-underline p-2 block hover:bg-gray-600">Register</a>
		</li>
	</ul>
</nav>
<slot />
