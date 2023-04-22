<form action="{{route('post.outcome')}}" method="post">
    @csrf
    <input name="incoming_package_id" placeholder="Номер посылки">
    <button type="submit">
        Ок
    </button>

    @if($errors)
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif
</form>
